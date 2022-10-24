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

public val Lucide.Github: ImageVector
    get() {
        if (_github != null) {
            return _github!!
        }
        _github = Builder(name = "Github", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(15.0f, 22.0f)
                verticalLineToRelative(-4.0f)
                arcToRelative(4.8f, 4.8f, 0.0f, false, false, -1.0f, -3.5f)
                curveToRelative(3.0f, 0.0f, 6.0f, -2.0f, 6.0f, -5.5f)
                curveToRelative(0.08f, -1.25f, -0.27f, -2.48f, -1.0f, -3.5f)
                curveToRelative(0.28f, -1.15f, 0.28f, -2.35f, 0.0f, -3.5f)
                curveToRelative(0.0f, 0.0f, -1.0f, 0.0f, -3.0f, 1.5f)
                curveToRelative(-2.64f, -0.5f, -5.36f, -0.5f, -8.0f, 0.0f)
                curveTo(6.0f, 2.0f, 5.0f, 2.0f, 5.0f, 2.0f)
                curveToRelative(-0.3f, 1.15f, -0.3f, 2.35f, 0.0f, 3.5f)
                arcTo(5.403f, 5.403f, 0.0f, false, false, 4.0f, 9.0f)
                curveToRelative(0.0f, 3.5f, 3.0f, 5.5f, 6.0f, 5.5f)
                curveToRelative(-0.39f, 0.49f, -0.68f, 1.05f, -0.85f, 1.65f)
                curveToRelative(-0.17f, 0.6f, -0.22f, 1.23f, -0.15f, 1.85f)
                verticalLineToRelative(4.0f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(9.0f, 18.0f)
                curveToRelative(-4.51f, 2.0f, -5.0f, -2.0f, -7.0f, -2.0f)
            }
        }
        .build()
        return _github!!
    }

private var _github: ImageVector? = null
