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

public val Lucide.Webhook: ImageVector
    get() {
        if (_webhook != null) {
            return _webhook!!
        }
        _webhook = Builder(name = "Webhook", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(18.0f, 16.98f)
                horizontalLineToRelative(-5.99f)
                curveToRelative(-1.1f, 0.0f, -1.95f, 0.94f, -2.48f, 1.9f)
                arcTo(4.0f, 4.0f, 0.0f, false, true, 2.0f, 17.0f)
                curveToRelative(0.01f, -0.7f, 0.2f, -1.4f, 0.57f, -2.0f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveToRelative(6.0f, 17.0f)
                lineToRelative(3.13f, -5.78f)
                curveToRelative(0.53f, -0.97f, 0.1f, -2.18f, -0.5f, -3.1f)
                arcToRelative(4.0f, 4.0f, 0.0f, true, true, 6.89f, -4.06f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveToRelative(12.0f, 6.0f)
                lineToRelative(3.13f, 5.73f)
                curveTo(15.66f, 12.7f, 16.9f, 13.0f, 18.0f, 13.0f)
                arcToRelative(4.0f, 4.0f, 0.0f, false, true, 0.0f, 8.0f)
            }
        }
        .build()
        return _webhook!!
    }

private var _webhook: ImageVector? = null
