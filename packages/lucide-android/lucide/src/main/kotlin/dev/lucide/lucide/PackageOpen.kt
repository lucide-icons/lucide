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

public val Lucide.PackageOpen: ImageVector
    get() {
        if (_packageOpen != null) {
            return _packageOpen!!
        }
        _packageOpen = Builder(name = "PackageOpen", defaultWidth = 24.0.dp, defaultHeight =
                24.0.dp, viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(20.91f, 8.84f)
                lineTo(8.56f, 2.23f)
                arcToRelative(1.93f, 1.93f, 0.0f, false, false, -1.81f, 0.0f)
                lineTo(3.1f, 4.13f)
                arcToRelative(2.12f, 2.12f, 0.0f, false, false, -0.05f, 3.69f)
                lineToRelative(12.22f, 6.93f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, false, 1.94f, 0.0f)
                lineTo(21.0f, 12.51f)
                arcToRelative(2.12f, 2.12f, 0.0f, false, false, -0.09f, -3.67f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveToRelative(3.09f, 8.84f)
                lineToRelative(12.35f, -6.61f)
                arcToRelative(1.93f, 1.93f, 0.0f, false, true, 1.81f, 0.0f)
                lineToRelative(3.65f, 1.9f)
                arcToRelative(2.12f, 2.12f, 0.0f, false, true, 0.1f, 3.69f)
                lineTo(8.73f, 14.75f)
                arcToRelative(2.0f, 2.0f, 0.0f, false, true, -1.94f, 0.0f)
                lineTo(3.0f, 12.51f)
                arcToRelative(2.12f, 2.12f, 0.0f, false, true, 0.09f, -3.67f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(12.0f, 22.0f)
                lineTo(12.0f, 13.0f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(20.0f, 13.5f)
                verticalLineToRelative(3.37f)
                arcToRelative(2.06f, 2.06f, 0.0f, false, true, -1.11f, 1.83f)
                lineToRelative(-6.0f, 3.08f)
                arcToRelative(1.93f, 1.93f, 0.0f, false, true, -1.78f, 0.0f)
                lineToRelative(-6.0f, -3.08f)
                arcTo(2.06f, 2.06f, 0.0f, false, true, 4.0f, 16.87f)
                verticalLineTo(13.5f)
            }
        }
        .build()
        return _packageOpen!!
    }

private var _packageOpen: ImageVector? = null
