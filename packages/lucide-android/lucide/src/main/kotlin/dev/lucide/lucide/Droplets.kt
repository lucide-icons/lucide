package dev.lucide.lucide

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.PathFillType
import androidx.compose.ui.graphics.PathFillType.Companion.NonZero
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.StrokeCap.Companion.Round
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.ImageVector.Builder
import androidx.compose.ui.graphics.vector.path
import androidx.compose.ui.unit.dp
import dev.lucide.Lucide

public val Lucide.Droplets: ImageVector
    get() {
        if (_droplets != null) {
            return _droplets!!
        }
        _droplets = Builder(name = "Droplets", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(7.0f, 16.3f)
                curveToRelative(2.2f, 0.0f, 4.0f, -1.83f, 4.0f, -4.05f)
                curveToRelative(0.0f, -1.16f, -0.57f, -2.26f, -1.71f, -3.19f)
                reflectiveCurveTo(7.29f, 6.75f, 7.0f, 5.3f)
                curveToRelative(-0.29f, 1.45f, -1.14f, 2.84f, -2.29f, 3.76f)
                reflectiveCurveTo(3.0f, 11.1f, 3.0f, 12.25f)
                curveToRelative(0.0f, 2.22f, 1.8f, 4.05f, 4.0f, 4.05f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(12.56f, 6.6f)
                arcTo(10.97f, 10.97f, 0.0f, false, false, 14.0f, 3.02f)
                curveToRelative(0.5f, 2.5f, 2.0f, 4.9f, 4.0f, 6.5f)
                reflectiveCurveToRelative(3.0f, 3.5f, 3.0f, 5.5f)
                arcToRelative(6.98f, 6.98f, 0.0f, false, true, -11.91f, 4.97f)
            }
        }
        .build()
        return _droplets!!
    }

private var _droplets: ImageVector? = null
